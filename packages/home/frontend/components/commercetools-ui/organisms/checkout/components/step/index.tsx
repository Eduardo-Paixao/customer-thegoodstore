import React from 'react';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';

interface Props {
  number: number;
  label: string;
  isExpanded: boolean;
  isCompleted: boolean;
  onEdit: () => void;
  Component: JSX.Element;
  Preview: JSX.Element;
  CTA?: JSX.Element;
}

const Step: React.FC<Props> = ({ number, label, isExpanded, isCompleted, onEdit, Component, Preview, CTA }) => {
  const { formatMessage } = useFormat({ name: 'common' });

  const headerClassName = useClassNames([
    'rounded-sm p-12 border transition lg:px-36 lg:py-24 lg:bg-white lg:border-none lg:rounded-md flex items-center justify-between',
    {
      'bg-primary-black border-primary-black': isExpanded,
      'bg-white border-neutral-400': !isExpanded,
    },
  ]);

  const numberClassName = useClassNames([
    'rounded-full bg-white w-24 h-24 flex items-center justify-center border text-14 md:text-16 font-medium transition lg:border-primary-black leading-[38px] md:w-30 md:h-30',
    {
      'border-white bg-primary-black text-white': isExpanded,
      'border-primary-black text-primary-black': !isExpanded,
    },
  ]);

  const labelClassName = useClassNames([
    'transition lg:text-primary-black lg:text-18',
    {
      'text-white': isExpanded,
      'text-primary-black': !isExpanded,
    },
  ]);

  return (
    <div className="bg-white">
      <div className={headerClassName}>
        <div className="flex cursor-default items-center gap-12">
          <span className={numberClassName}>{number}</span>
          <h5 className={labelClassName}>{label}</h5>
        </div>
        {isCompleted && !isExpanded && (
          <p
            className="text-14 text-secondary-black underline decoration-secondary-black underline-offset-2 hover:cursor-pointer"
            onClick={onEdit}
          >
            {formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
          </p>
        )}
        {isExpanded && CTA}
      </div>
      <div>
        <div className={isCompleted && !isExpanded ? 'block' : 'hidden'}>{Preview}</div>
        <div className={isExpanded ? 'block' : 'hidden'}>{Component}</div>
      </div>
    </div>
  );
};

export default Step;
