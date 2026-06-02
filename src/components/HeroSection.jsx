import Slider   from './hero/Slider';    
import HeroText from './hero/HeroText';  


const css = `
  .hs-wrap {
    position: relative;
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    overflow: hidden;
    background: #02060B;
  }
  @media (max-width: 768px) {
    .hs-wrap {
      min-height: 100vh;
      min-height: 100dvh;
    }
  }
  @media (max-width: 480px) {
    .hs-wrap {
      min-height: 100vh;
      min-height: 100dvh;
    }
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
