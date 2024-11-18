import { Roller } from "react-css-spinners";

export default function Spinner() {
    return (
      <div className="fixed inset-0 flex items-center justify-center h-full">
        <Roller
            color="rgba(240,52,52)"
            size={100}
        />
      </div>
    );
  }
  