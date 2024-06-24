import noProject from "../assets/no-projects.png";
import { useRef } from "react";

export default function ProjectDetails({
  details,
  onCreateProject,
  onDeleteProject,
  onCreateTask,
  onDeleteTask,
}) {
  const fomattedDate = new Date(details?.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const taskRef = useRef();

  function addTaskHandler(projectIdx, task, taskIdx) {
    onCreateTask(projectIdx, task, taskIdx);

    taskRef.current.value = "";
  }

  return (
    <section className="flex justify-center items-center px-10">
      {/* if there are no details found */}
      {!details && (
        <div className="flex flex-col justify-center items-center gap-5">
          <img src={noProject} alt="no project" className="w-12 h-12" />
          <h2 className=" text-[27px] font-bold"> No Project selected </h2>
          <h4>Select a project or Create a new one </h4>
          <button
            className="bg-[#6b5353] py-2 px-4 rounded-md text-white"
            onClick={onCreateProject}
          >
            Create A New Project
          </button>
        </div>
      )}

      {/* if there are details */}
      {details && (
        <div className="w-[80%]">
          {/* begin::Details of project */}
          <div className="flex justify-between items-center">
            <h1 className=" text-[27px] font-bold"> {details.title}</h1>
            <button
              className="cursor-pointer text-[red]"
              onClick={() => onDeleteProject()}
            >
              Delete
            </button>
          </div>
          <div className="mt-2 text-[16px] text-[gray] font-semibold ">
            {fomattedDate}
          </div>
          <pre className="mt-4 border-b-2 border-[#888] pb-5 whitespace-pre-wrap">
            {details.desc}
          </pre>
          {/* begin::Adding tasks */}
          <h3 className=" text-[24px] font-bold pt-3">Tasks</h3>
          <div className="flex gap-3">
            <input
              ref={taskRef}
              type="text"
              className="bg-[#cccaca] mt-1 p-2 border-b-2 border-[#a6a6a6] focus:outline-none focus:border-b-2  focus:border-[black]"
            />
            <button
              onClick={() =>
                addTaskHandler(
                  details.idx,
                  taskRef?.current?.value,
                  details.tasks.length
                )
              }
            >
              Add Task
            </button>
          </div>
          <div className="mt-7 flex flex-col gap-3 bg-[#dedede] p-3">
            {details.tasks.length == 0 && <p>No Tasks Added Yet ...</p>}

            {details.tasks &&
              details.tasks.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <p className=" mt-0">{item.title}</p>
                  <button
                    onClick={() => onDeleteTask(details.idx, item.id)}
                    className="cursor-pointer text-[red]"
                  >
                    Clear
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
}
