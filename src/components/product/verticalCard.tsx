type VerticalCardProps = {
  title: string;
  description?: string;
  image?: string;
  backgroundColor?: string;
};

export default function VerticalCard(props: VerticalCardProps) {
  return (
    <div
      className="rounded-lg flex flex-col h-full relative  items-center overflow-hidden justify-center px-2 pt-2 top-0 left-0"
      style={{
        backgroundColor: props.backgroundColor,
      }}
    >
      <div className="absolute top-3 right-3 bg-red-500 p-1.5 rounded text-white text-sm font-bold">
        30%
      </div>
      {props.image && (
        <div className="overflow-hidden  w-full h-full">
          <img className="top-0 left-0 z-10 object-cover" src={props.image} />
        </div>
      )}
      <div className="h-1/3  w-full flex flex-col justify-center items-center">
        <span className="font-bold text-sm z-50 mb-3">{props.title}</span>
        <span className="font-bold text-sm z-50 text-gray-400 line-through leading-none">
          200$
        </span>
        <span className="font-bold text-lg z-50">200$</span>
      </div>
    </div>
  );
}
