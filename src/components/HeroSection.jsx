import Slider   from './Slider';    
import HeroText from './HeroText';  


const css = `
  .hs-wrap {
    position: relative;
    width: 100%;
    height: 90vh;
    max-height: 90vh;
    overflow: hidden;
    background: #02060B;
  }
  @media (max-width: 768px) {
    .hs-wrap { height: 75vh; max-height: 75vh; }
  }
  @media (max-width: 480px) {
    .hs-wrap { height: 60vh; max-height: 60vh; }
  }
`;

export default function HeroSection() {
  return (
    <>
      <style>{css}</style>
      <div className="hs-wrap">
        <Slider />  
        <HeroText />  
      </div>
    </>
  );
}
