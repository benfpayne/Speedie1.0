import * as React from 'react';

export default function VerticalBox(props: any) {
  const { title, description } = props;
  return (
      <div className="flex flex-col p-4 pb-16 bg-greenBackground rounded-xl text-white">
        <p className="font-sans text-2xl text-accentGreen">{title}</p>
        <p className="text-lg mt-4">{description}</p>
      </div>
  );
}
