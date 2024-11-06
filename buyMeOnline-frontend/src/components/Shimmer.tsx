

type shimmerProps={
  width:string,
  height:string,
}
const Shimmer = ({ width , height  }: shimmerProps) => (
    <div
      className={`animate-pulse bg-gray-200 rounded-lg m-5  ${width} ${height}`}
    />
  );
  
  export default Shimmer;
  