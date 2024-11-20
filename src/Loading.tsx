import { Style } from "@solidjs/meta";

// Kindly obtained from https://10015.io/tools/css-loader-generator

export default () => <>
	<div class="dots"></div>

<Style>{`
.dots {
   width: 56px;
   height: 26.9px;
   background: radial-gradient(circle closest-side,#ff47cd 90%,#0000) 0%   50%,
          radial-gradient(circle closest-side,#ff47cd 90%,#0000) 50%  50%,
          radial-gradient(circle closest-side,#ff47cd 90%,#0000) 100% 50%;
   background-size: calc(100%/3) 13.4px;
   background-repeat: no-repeat;
   animation: dots-7ar3yq 1s infinite linear;
}

@keyframes dots-7ar3yq {
   20% {
      background-position: 0%   0%, 50%  50%,100%  50%;
   }

   40% {
      background-position: 0% 100%, 50%   0%,100%  50%;
   }

   60% {
      background-position: 0%  50%, 50% 100%,100%   0%;
   }

   80% {
      background-position: 0%  50%, 50%  50%,100% 100%;
   }
}`}
</Style>
</>;
