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
          const Component = dynamic<{locale: typeof locale}>(() => import(`./${componentName}`).then(mod => {
            return mod instanceof Function ? mod : mod.default || mod[componentName.split('-').map(capitalize).join('')] || mod[componentName.split('-').map(n => n.toUpperCase()).join('')] || (() => {
            console.warn(`No component found for ${componentData.__component} in ${mod} with property default or ${componentName.split('-').map(capitalize).join('')} or ${componentName.split('-').map(n => n.toUpperCase()).join('')}`);
            return null;
          })}))
          return <Component key={componentData.id} {...componentData} locale={locale} />;
        })}
    </div>
  );
};

export default DynamicZoneManager;
