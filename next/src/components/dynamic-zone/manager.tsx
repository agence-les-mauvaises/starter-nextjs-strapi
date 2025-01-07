import React from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

interface DynamicZoneComponent {
  __component: string;
  id: number;
  [key: string]: any;
}

interface Props {
  dynamicZone: DynamicZoneComponent[];
  locale: string;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const DynamicZoneManager: React.FC<Props> = ({ dynamicZone, locale }) => {
  return (
    <div>
      {dynamicZone.map((componentData) => {
        const componentName = componentData.__component.split(".").pop()!;
        const Component = dynamic<{ locale: typeof locale }>(() =>
          import(`./${componentName}`)
            .then((mod) => {
              return mod instanceof Function
                ? mod
                : mod.default ||
                    mod[componentName.split("-").map(capitalize).join("")] ||
                    mod[
                      componentName
                        .split("-")
                        .map((n) => n.toUpperCase())
                        .join("")
                    ] ||
                    (() => (
                      <ComponentNotFound
                        componentId={componentData.__component}
                      />
                    ));
            })
            .catch(() => () => (
              <ComponentNotFound componentId={componentData.__component} />
            ))
        );
        return (
          <Component
            key={componentData.id}
            {...componentData}
            locale={locale}
          />
        );
      })}
    </div>
  );
};

const ComponentNotFound = ({ componentId }: { componentId: string }) => {
  const componentName = componentId.split(".").pop()!;
  console.warn(
    `No component found for ${componentId} with property default or ${componentName
      .split("-")
      .map(capitalize)
      .join("")} or ${componentName
      .split("-")
      .map((n) => n.toUpperCase())
      .join("")}`
  );
  return process.env.NODE_ENV === "development" ? (
    <p className="text-red-500 text-center">
      No component found for {componentId} with property default or{" "}
      {componentName.split("-").map(capitalize).join("")} or{" "}
      {componentName
        .split("-")
        .map((n) => n.toUpperCase())
        .join("")}
    </p>
  ) : null;
};

export default DynamicZoneManager;
