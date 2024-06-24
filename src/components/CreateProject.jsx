import { forwardRef, useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const ForwardRef = forwardRef(function Log({ onAdd }, ref) {
  const dialogRef = useRef();

  const titleRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  function addProject() {
    const titleVal = titleRef.current.value;
    const descVal = descriptionRef.current.value;
    const dateVal = dateRef.current.value;

    onAdd({ title: titleVal, desc: descVal, date: dateVal });

    titleRef.current.value = "";
    descriptionRef.current.value = "";
    dateRef.current.value = "";
  }

  return createPortal(
    <dialog ref={dialogRef} className="w-[75%] md:w-[50%]">
      <div
        className="bg-[#0d0d0dc6] fixed top-0 left-0 w-full h-screen z-[-9999]"
        onClick={() => dialogRef.current?.close()}
      ></div>
      <div className=" px-4 py-12 bg-white">
        <form method="dialog" className="flex justify-end gap-3">
          <button>cancel</button>
          <button
            onClick={addProject}
            className="bg-black text-white py-1 px-2 rounded-md"
          >
            save
          </button>
        </form>
        <section className="flex flex-col">
          <label htmlFor="title" className="font-bold">
            Title
          </label>
          <input
            ref={titleRef}
            id="title"
            type="text"
            className="bg-[#cccaca] mt-1 p-2 border-b-2 border-[#a6a6a6] focus:outline-none focus:border-b-2  focus:border-[black]"
          />
          <label htmlFor="description" className="font-bold mt-3">
            Description
          </label>
          <textarea
            ref={descriptionRef}
            id="description"
            className="bg-[#cccaca] mt-1 p-2 border-b-2 border-[#a6a6a6] focus:outline-none focus:border-b-2  focus:border-[black]"
          />
          <label htmlFor="date" className="font-bold mt-3">
            Date
          </label>
          <input
            ref={dateRef}
            id="date"
            type="date"
            className="bg-[#cccaca] mt-1 p-2 border-b-2 border-[#a6a6a6] focus:outline-none focus:border-b-2  focus:border-[black]"
          />
        </section>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ForwardRef;
