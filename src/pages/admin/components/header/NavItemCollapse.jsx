import React, { useEffect, useState } from "react";

const NavItemCollapse = ({
  title,
  children,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const [isChecked, setIsChecked] = useState(name === activeNavName);

  useEffect(() => {
    setIsChecked(name === activeNavName);
  }, [activeNavName, name]);

  return (
    <div className="d-collapse d-collapse-arrow bg-base-200 min-h-0 rounded-none py-2">
      <input
        type="checkbox"
        className="min-h-0 py-0"
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
          setActiveNavName(isChecked ? null : name);
        }}
      />
      <div
        className={`d-collapse-title font-medium min-h-0 py-0 pl-0 flex items-center gap-x-2 text-lg ${
          isChecked ? "font-bold text-primary" : "font-semibold text-[#A5A5A5]"
        }`}
      >
        {icon}
        {title}
      </div>
      <div className="d-collapse-content">
        <div className="mt-2 flex flex-col gap-y-2">{children}</div>
      </div>
    </div>
  );
};
export default NavItemCollapse;
