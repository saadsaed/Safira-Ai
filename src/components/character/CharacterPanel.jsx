import CharacterFrame from './CharacterFrame';
import StatusRings from './StatusRings';
import ThinkingRing from './ThinkingRing';
import SpeakingWaves from './SpeakingWaves';
import NamePlate from './NamePlate';
import StatusLine from './StatusLine';

export default function CharacterPanel({ status }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      <StatusRings status={status} />
      
      <div className="relative flex justify-center items-center h-[250px] w-[250px]">
        <ThinkingRing status={status} />
        <CharacterFrame status={status} />
        <SpeakingWaves status={status} />
      </div>

      <NamePlate />
      <StatusLine status={status} />
    </div>
  );
}
