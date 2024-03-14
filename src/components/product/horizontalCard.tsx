type HorizontalCardProps = {
  title: string;
  description?: string;
  image?: string;
  backgroundColor?: string;
};

export default function HorizontalCard(props: HorizontalCardProps) {
  if (props.description) {
    return (
      <div
        className="rounded-lg flex h-full relative items-center overflow-hidden justify-start "
        style={{
          minHeight: 195,
          backgroundColor: props.backgroundColor,
        }}
      >
        <div className="flex flex-col pl-10">
          <span className="font-bold text-xl z-50 mb-3">{props.title}</span>
          <span className="text-sm z-50">{props.description}</span>
        </div>
        <div className="flex items-center overflow-hidden absolute justify-center "></div>
        {props.image && (
          <img
            className="top-0 -right-10 absolute z-10 object-cover"
            src={props.image}
            style={{ height: 170 }}
          />
        )}
      </div>
    );
  }
  return (
    <div
      className="rounded-lg flex h-full relative items-center overflow-hidden justify-center top-0 left-0"
      style={{
        minHeight: 195,
        backgroundColor: props.backgroundColor,
      }}
    >
      <span className="font-bold text-3xl z-50">{props.title}</span>
      <div className="flex items-center overflow-hidden absolute justify-center "></div>
      {props.image && (
        <img
          className="top-0 left-0 absolute z-10 object-cover"
          src={props.image}
          style={{ height: 600 }}
        />
      )}
    </div>
  );
}
