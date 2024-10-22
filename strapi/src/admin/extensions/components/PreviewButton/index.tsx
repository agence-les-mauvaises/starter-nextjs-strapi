import React from 'react';
import { Button } from '@strapi/design-system/Button';
import Eye from '@strapi/icons/Eye';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { useIntl } from 'react-intl';

const PreviewButton = () => {
  const { formatMessage } = useIntl();
  const { modifiedData, layout } = useCMEditViewDataManager();

  const bannedApiID = ['category'];

  if (bannedApiID.includes(layout.apiID)) {
    return null;
  }

  if (
    !process.env.NEXT_PUBLIC_APP_URL ||
    !process.env.PREVIEW_SECRET
  ) {
    return null;
  }

  const handlePreview = () => {
    const previewUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/preview?secret=${process.env.PREVIEW_SECRET}&slug=${modifiedData.slug}&locale=${modifiedData.locale}&apiID=${layout.apiID}&kind=${layout.kind}`;

    window.open(previewUrl, '_blank')?.focus();
  };

  const content = {
    id: 'components.PreviewButton.button',
    defaultMessage: 'Preview',
  };

  return (
    <>
      <Button variant="secondary" startIcon={<Eye />} onClick={handlePreview}>
        {formatMessage(content)}
      </Button>
    </>
  );
};

export default PreviewButton;