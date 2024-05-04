import React from 'react'
import { Card, CardBody, Spinner } from '@nextui-org/react'

interface TitleProps {
  title: string;
}

export default function Title<TitleProps>({ title }: { title: string }) {
  return (
    <Card>
      <CardBody>{title}</CardBody>
    </Card>
  );
}
