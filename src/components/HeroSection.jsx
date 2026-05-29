import Slider   from './Slider';    
import HeroText from './HeroText';  


const css = `
  .hs-wrap {
    position: relative;
    width: 100%;
    height: 65vh;
    max-height: 65vh;
    overflow: hidden;
    background: #02060B;
  }
  @media (max-width: 768px) {
    .hs-wrap { height: 50vh; max-height: 50vh; }
  }
  @media (max-width: 480px) {
    .hs-wrap { height: 42vh; max-height: 42vh; }
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
