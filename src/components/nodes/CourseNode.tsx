import { Handle, Position } from "reactflow";

const CourseNode = ({
  data: {
    Course,
    Section,
    Cr,
    Days,
    Times,
    Title,
    DistReq,
    Diversity,
    Room,
    Reg,
    Max,
    Exam,
    Faculty,
  },
}: {
  data: {
    Course: string;
    Section: string;
    Cr: string;
    Days: string;
    Times: string;
    Title: string;
    DistReq: string;
    Diversity: string;
    Room: string;
    Reg: number;
    Max: string;
    Exam: string;
    Faculty: string;
  };
}) => {
  const days = Days.split("");

  return (
    <div className="flex flex-col w-full h-full p-10 transition duration-300 ease-in-out bg-white border border-black rounded-lg shadow-md hover:shadow-xl ">
      <div className="flex flex-row text-base">
        <span className="">{Title}</span>
      </div>
      <div className="flex flex-row text-sm  absolute -top-4 left-10">
        <div className="flex flex-row px-6 py-2 bg-white border border-black rounded-md mb-2">
          <span className="mr-2">{Course}</span>
          <span>{Section}</span>
        </div>
      </div>
      <div className="w-80 flex flex-row space-x-2 mt-2">
        <DayCal days={days} day={"M"} />
        <DayCal days={days} day={"T"} />
        <DayCal days={days} day={"W"} />
        <DayCal days={days} day={"R"} />
        <DayCal days={days} day={"F"} />
      </div>
      <div className="mt-2 flex flex-row justify-startitems-center absolute -top-5 right-10">
        {DistReq.split("").map((req) => (
          <span className="ml-2 px-4 py-1 border border-sky-300 bg-sky-100 text-sm text-sky-500 rounded-md">
            {req}
          </span>
        ))}
        {Diversity.split("").map((req) => (
          <span className="ml-2 px-4 py-1 border border-orange-300 bg-orange-100 text-sm text-orange-500 rounded-md">
            {req}
          </span>
        ))}
      </div>
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

const DayCal = ({ days, day }: { days: string[]; day: string }) => {
  return (
    <div
      className={`flex w-1/5 py-2 border  rounded-md items-center justify-center text-xs ${
        days.includes(day)
          ? "bg-lime-100  border-lime-500 text-lime-600"
          : "bg-white border-neutral-300 text-neutral-500"
      }`}
    >
      <span>{day}</span>
    </div>
  );
};

export default CourseNode;
