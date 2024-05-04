import React from 'react'
import { Card, CardBody } from '@nextui-org/react';

interface HackathonCardProps {
  data: {
    name: string;
  }
}

const HackathonCard: React.FC<HackathonCardProps> = ({ data }) => {
  return (
    <Card isPressable fullWidth isHoverable>
      <CardBody>
        <p>{data.name}</p>
      </CardBody>
    </Card>
  );
};

export default HackathonCard;
