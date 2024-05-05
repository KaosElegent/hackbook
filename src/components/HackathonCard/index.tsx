import React from 'react'
import { Card, CardBody } from '@nextui-org/react';
import Hackathon from "@/db/models/hackathon";

interface HackathonCardProps {
  data: {
    name: string;
  };
  onCardClick: () => void;
}

const HackathonCard: React.FC<HackathonCardProps> = ({ data, onCardClick }) => {
  return (
    <Card isPressable fullWidth isHoverable onPress={onCardClick}>
      <CardBody>
        <p>{data.name}</p>
      </CardBody>
    </Card>
  );
};

export default HackathonCard;
