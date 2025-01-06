import { FC, ComponentType } from "react";

// Type for the props of the wrapped component
type WithScrollAnimationProps = {
  // Define the props that will be passed to the wrapped component
  // For now, it could be an empty object or extend specific prop types if needed
  [key: string]: unknown;
};

const withScrollAnimation = <P extends object>(
  Component: ComponentType<P>
): FC<P & WithScrollAnimationProps> => {
  const WrappedComponent: FC<P & WithScrollAnimationProps> = (props) => {
    return (
      <div className="animate-on-scroll">
        <Component {...props} />
      </div>
    );
  };

  // Assign a display name for easier debugging
  WrappedComponent.displayName = `withScrollAnimation(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export default withScrollAnimation;
