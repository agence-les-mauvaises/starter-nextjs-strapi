import { AmbientColor } from '@/components/decorations/ambient-color';
import DynamicZoneManager from '@/components/dynamic-zone/manager'
import { notFound } from 'next/navigation';

export default function PageContent({ pageData }: { pageData: any }) {
  const dynamicZone = pageData?.dynamic_zone;
  if (!dynamicZone || dynamicZone.length === 0) {
    return notFound();
  }
  return (
    <div className="relative overflow-hidden w-full">
      <AmbientColor />
      {dynamicZone && (<DynamicZoneManager dynamicZone={dynamicZone} locale={pageData.locale} />)}
    </div>
  );
}
