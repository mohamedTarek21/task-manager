export default function SideBar({
  projects,
  selectedProject,
  onCreate,
  onGetData,
}) {
  return (
    <aside className="bg-black h-screen p-3 pt-10">
      <h1 className="text-white text-[27px] font-bold">Your projects</h1>
      <button
        className="bg-[#9b9b9b] text-white mt-10 py-2 px-4 rounded-sm"
        onClick={onCreate}
      >
        + Add Project
      </button>
      {/* created projects list */}
      {projects.length == 0 && (
        <p className="text-white mt-7">No Projects Created Yet ...</p>
      )}
      <div className="mt-7 flex flex-col gap-1">
        {projects.map((item, idx) => (
          <p
            key={idx}
            className={`${
              item.idx == selectedProject?.idx ? "bg-[#494949]" : "undfined"
            }
                cursor-pointer p-1 rounded`}
            onClick={() => onGetData(item)}
          >
            <span className="text-white mt-0">{item.title}</span>
          </p>
        ))}
      </div>
      <div className="flex justify-center items-center px-10"></div>
    </aside>
  );
}
