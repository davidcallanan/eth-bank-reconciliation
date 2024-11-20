import { Style } from "@solidjs/meta";

// Kindly obtained from https://10015.io/tools/css-loader-generator

export default () => (<>
	<div class="pulse"></div>

	<Style>
	{`.pulse {
	position: relative;
	height: 112px;
	width: 112px;
	}

	.pulse:before,
	.pulse:after {
	border-radius: 50%;
	content: '';
	position: absolute;
	}

	.pulse:before {
	background: #474bff;
	height: 22.4px;
	width: 22.4px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	}

	.pulse:after {
	animation: pulse-t3pv1p 1.5s infinite;
	border: 11.2px solid #474bff;
	height: 100%;
	width: 100%;
	}

	@keyframes pulse-t3pv1p {
	from {
		opacity: 1;
		transform: scale(0);
	}

	to {
		opacity: 0;
		transform: scale(1);
	}
	}`}
	</Style>
</>);
