import React from 'react'
import { PropagateLoader, BeatLoader } from 'react-spinners';

function Loading({loading}) {
    return (
        <div className="spinner-container al">
          <BeatLoader color="rgb(83, 128, 0)" loading={loading} size={30} />
        </div>
      );
}

export default Loading

export function LoadingPropagate({loading}) {
  return (
    <div className="spinner-container al">
      <PropagateLoader color="rgb(255, 255, 255)" className='p-3' loading={loading} size={13} />
    </div>
  );
}

