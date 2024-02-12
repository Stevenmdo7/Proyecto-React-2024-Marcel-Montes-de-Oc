import React from 'react';

const ElfsightWidget = () => {
  return (
    <div>
      <script
        src="https://static.elfsight.com/platform/platform.js"
        data-use-service-core
        defer
      ></script>
      <div
        className="elfsight-app-c88c1868-fb67-46c7-9c16-77010df96060"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default ElfsightWidget;