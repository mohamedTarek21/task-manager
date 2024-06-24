import { useState, useRef } from "react";
import CreateProject from "./components/CreateProject";
import ProjectDetails from "./components/ProjectDetails";
import SideBar from "./components/SideBar";

function cloneProjectsHandler(prevProjects) {
  return {
    ...prevProjects,
    projects: prevProjects.projects.map((project) => ({
      ...project,
      tasks: [...project.tasks],
    })),
  };
}

function selectedProjectHandler(projects, projectIdx) {
  return projects.find((project) => project.idx == projectIdx);
}

export default function App() {
  const customRef = useRef();

  const [projectsState, projectsStateHandler] = useState({
    projects: [],
    selectedProject: null,
  });

  function showCreateProject() {
    customRef.current.open();
  }

  function createProject(projectData) {
    projectsStateHandler((prevProjects) => {
      const projectsData = {
        projects: [
          ...prevProjects.projects,
          { ...projectData, idx: projectsState.projects.length,   },
        ],

        selectedProject: null,
      };
      return projectsData;
    });
  }

  function deleteProject() {
    projectsStateHandler((prevProjects) => {
      const newProjects = {
        projects: prevProjects.projects.filter(
          (item) => item.idx !== prevProjects.selectedProject.idx
        ),
        selectedProject: null,
      };

      return newProjects;
    });
  }

  function getProjectData(data) {
    projectsStateHandler((prevProjects) => {
      return {
        projects: prevProjects.projects,
        selectedProject: data,
      };
    });
  }

  function addTaskToProject(projectIdx, task, taskIdx) {
    projectsStateHandler((prevProjects) => {
      const cloneProjects = cloneProjectsHandler(prevProjects);

      const selectedProject = selectedProjectHandler(
        cloneProjects.projects,
        projectIdx
      );

      selectedProject.tasks.push({ title: task, id: taskIdx });

      return {
        ...cloneProjects,
        selectedProject: {
          ...cloneProjects.selectedProject,
          tasks: selectedProject.tasks,
        },
      };
    });
  }

  function deleteTask(projectIdx, taskIdx) {
    projectsStateHandler((prevProjects) => {
      const cloneProjects = cloneProjectsHandler(prevProjects);

      const selectedProject = selectedProjectHandler(
        cloneProjects.projects,
        projectIdx
      );

      const index = cloneProjects.selectedProject.tasks.findIndex(
        (item) => item.id === taskIdx
      );

      selectedProject.tasks.splice(index, 1);

      return {
        ...cloneProjects,
        selectedProject: {
          ...cloneProjects.selectedProject,
          tasks: selectedProject.tasks,
        },
      };
    });
  }

  return (
    <main>
      <div className="w-full grid grid-cols-[300px_minmax(0,1fr)] gap-[30px]">
        <SideBar
          onCreate={showCreateProject}
          onGetData={getProjectData}
          projects={projectsState.projects}
          selectedProject={projectsState.selectedProject}
        ></SideBar>

        <ProjectDetails
          details={projectsState.selectedProject}
          onCreateProject={showCreateProject}
          onDeleteProject={deleteProject}
          onCreateTask={addTaskToProject}
          onDeleteTask={deleteTask}
        />
      </div>
      <CreateProject ref={customRef} onAdd={createProject} />
    </main>
  );
}
