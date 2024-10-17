import React from 'react';
import dynamic from 'next/dynamic';

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
      {
        dynamicZone.map((componentData) => {
          const componentName = componentData.__component.split('.').pop()!
          const Component = dynamic<{locale: typeof locale}>(() => import(`./${componentName}`).then(mod => mod.default || mod[capitalize(componentName)]) || (() => {
            console.warn(`No component found for: ${componentData.__component}`);
            return null;
          }))
          return <Component key={componentData.id} {...componentData} locale={locale} />;
        })}
    </div>
  );
};

export default DynamicZoneManager;
