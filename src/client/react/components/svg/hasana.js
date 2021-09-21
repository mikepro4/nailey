import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Leyla extends Component {
    render() {
        return (
            <div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="183"
                    height="42"
                    fill="none"
                    viewBox="0 0 183 42"
                >
                    <path
                        fill="#000"
                        d="M89.463 11.63a43.59 43.59 0 00.086-2.705V7.079c0-.758-.123-1.326-.37-1.704-.246-.379-.627-.568-1.143-.568-.241 0-.478.042-.71.128-.227.08-.43.187-.61.319a3.252 3.252 0 00-.504.462c-.157.18-.291.355-.405.525-.109.17-.208.348-.298.532v2.123c0 1.075.028 1.986.085 2.734h-.93c.061-.81.092-1.72.092-2.734V2.72c0-1.003-.03-1.91-.092-2.719h.93a36.723 36.723 0 00-.085 2.72v3.748c.109-.232.246-.454.412-.667.17-.213.369-.412.596-.597.227-.189.492-.34.795-.454.303-.114.618-.17.945-.17.695 0 1.211.215 1.547.646.336.426.504 1.098.504 2.016v1.683c0 .89.033 1.791.1 2.705h-.945zM83.102 8.662h.17c-.118.847-.27 1.52-.454 2.016-.185.493-.393.833-.625 1.023a1.283 1.283 0 01-.852.291c-.473 0-.835-.17-1.086-.511-.246-.341-.37-.935-.37-1.782V5.04h-1.569v-.17h.157c.175 0 .336-.012.482-.036.147-.028.275-.066.384-.113.113-.048.215-.105.305-.17.09-.072.166-.15.227-.235.062-.085.114-.178.157-.277.047-.104.082-.213.106-.327.028-.118.052-.239.071-.362.019-.128.028-.258.028-.39l.015-.42a6.653 6.653 0 000-.432v-.22h.688c0 .364-.014.679-.042.944-.029.26-.086.537-.17.83a1.782 1.782 0 01-.42.739c-.189.204-.43.36-.724.469h3.124v.17h-2.059V9.77c0 .743.074 1.261.22 1.555.147.288.37.433.668.433.383 0 .7-.232.951-.696.251-.464.457-1.264.618-2.4z"
                    ></path>
                    <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M98.573 9.102h-.17c-.223.805-.566 1.437-1.03 1.896-.46.46-1.05.689-1.775.689-.454 0-.866-.095-1.236-.284a2.548 2.548 0 01-.894-.781 3.86 3.86 0 01-.526-1.108 4.513 4.513 0 01-.184-1.3 6.4 6.4 0 01.07-.93h5.354c0-.345-.066-.679-.198-1a2.706 2.706 0 00-.554-.867 2.509 2.509 0 00-.916-.61 3.28 3.28 0 00-1.243-.227 3.32 3.32 0 00-2.385.994c-.303.312-.545.7-.724 1.164a4.19 4.19 0 00-.263 1.505c0 1.108.329 1.998.987 2.67.658.672 1.507 1.008 2.549 1.008.833 0 1.507-.248 2.023-.745.52-.502.892-1.193 1.115-2.074zm-4.878-3.727c.417-.417.937-.625 1.562-.625.677 0 1.195.225 1.555.674.36.45.54 1.011.54 1.683h-4.488c.142-.743.42-1.32.831-1.732z"
                        clipRule="evenodd"
                    ></path>
                    <path
                        fill="#000"
                        d="M134.134 35.483a2.47 2.47 0 01-.475 1.02h2.317a2.458 2.458 0 01-.475-1.02 6.505 6.505 0 01-.116-1.31v-8.63l-1.726.881c.239.309.398.649.475 1.02.077.362.116.795.116 1.297v5.433c0 .502-.039.938-.116 1.309zM133.949 22.578c-.163-.178-.244-.41-.244-.695 0-.278.085-.498.255-.66.17-.17.394-.255.672-.255a.893.893 0 01.927.915c0 .286-.089.517-.267.695a.893.893 0 01-.66.255c-.286 0-.514-.085-.683-.255zM.649 35.39c-.1.37-.317.742-.649 1.112h2.989c-.34-.363-.56-.73-.66-1.1-.101-.37-.151-.858-.151-1.46v-5.201h8.99v5.201c0 .595-.051 1.078-.151 1.448-.1.37-.317.742-.65 1.112h2.99c-.34-.363-.56-.73-.66-1.1-.101-.37-.151-.858-.151-1.46v-9.94c0-.578.05-1.053.15-1.424.109-.37.329-.734.66-1.089h-2.988c.332.355.548.718.649 1.089.1.363.15.838.15 1.425v4.413h-8.99v-4.413c0-.58.051-1.054.151-1.425.109-.37.329-.734.66-1.089H0c.332.355.548.718.649 1.089.1.363.15.838.15 1.425v9.94c0 .594-.05 1.077-.15 1.447z"
                    ></path>
                    <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M15.745 33.131c-.116.294-.174.61-.174.95 0 .796.274 1.417.823 1.865.556.448 1.235.672 2.039.672 1.652 0 2.992-.907 4.02-2.722v2.792l1.748-.892a2.378 2.378 0 01-.474-.997 6.52 6.52 0 01-.116-1.332V30.19c0-.572-.02-1.062-.058-1.471a6.644 6.644 0 00-.255-1.275c-.124-.44-.301-.795-.533-1.065-.224-.278-.537-.506-.938-.684-.402-.177-.885-.266-1.448-.266-.943 0-1.78.2-2.514.602-.726.402-1.286.88-1.68 1.437l.684 2.062c.34-2.549 1.386-3.823 3.139-3.823 1.63 0 2.444 1.131 2.444 3.394v.59l-1.97.545c-.37.1-.671.186-.903.255-.224.07-.529.174-.915.313a7.683 7.683 0 00-.938.405 8.364 8.364 0 00-.823.51c-.3.2-.54.413-.718.637a3.24 3.24 0 00-.44.776zm1.575 2.248c-.409-.371-.614-.858-.614-1.46 0-.324.066-.63.197-.915.132-.294.286-.545.464-.753.185-.209.436-.413.753-.614a8.4 8.4 0 01.845-.498c.247-.124.568-.255.962-.394.394-.147.691-.251.892-.313.208-.062.49-.143.846-.243l.787-.232v3.87c-.965 1.405-2.124 2.108-3.475 2.108-.687 0-1.24-.186-1.657-.556z"
                        clipRule="evenodd"
                    ></path>
                    <path
                        fill="#000"
                        d="M26.416 35.054v-2.537c.27 1.12.772 2.047 1.506 2.78.741.727 1.653 1.09 2.734 1.09.71 0 1.29-.167 1.737-.499.448-.34.676-.83.684-1.47v-.059c0-.363-.066-.691-.197-.985-.14-.308-.375-.59-.707-.845a7.077 7.077 0 00-.81-.556 11.99 11.99 0 00-.974-.51l-.208-.104c-.355-.155-.587-.255-.695-.301-.1-.054-.305-.15-.614-.29a8.467 8.467 0 01-.603-.313c-.1-.061-.266-.162-.498-.3-.231-.148-.39-.267-.475-.36-.085-.093-.2-.212-.347-.36a1.484 1.484 0 01-.29-.44 7.51 7.51 0 01-.139-.474 1.89 1.89 0 01-.058-.556c.008-.811.352-1.437 1.031-1.877.68-.44 1.56-.66 2.642-.66 1.444 0 2.606.378 3.486 1.135v2.155c-.285-.997-.776-1.753-1.47-2.27a3.803 3.803 0 00-2.353-.789c-.687 0-1.243.159-1.668.475-.424.31-.64.746-.648 1.31v.057c0 .24.046.467.139.684.092.232.22.428.382.59.162.163.378.325.649.487.27.162.536.305.799.429.263.123.575.262.938.417a20.065 20.065 0 011.413.649c.263.13.56.312.893.544.34.224.61.452.81.683.201.224.371.502.51.834.132.317.197.65.197.997v.058c-.023.88-.386 1.56-1.089 2.038-.695.472-1.571.707-2.63.707-1.606 0-2.965-.521-4.077-1.564z"
                    ></path>
                    <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M36.6 33.131c-.115.294-.173.61-.173.95 0 .796.274 1.417.822 1.865.556.448 1.236.672 2.039.672 1.653 0 2.993-.907 4.02-2.722v2.792l1.749-.892a2.378 2.378 0 01-.475-.997 6.513 6.513 0 01-.116-1.332V30.19c0-.572-.02-1.062-.058-1.471a6.652 6.652 0 00-.255-1.275c-.123-.44-.3-.795-.532-1.065-.224-.278-.537-.506-.939-.684-.401-.177-.884-.266-1.448-.266-.942 0-1.78.2-2.514.602-.726.402-1.285.88-1.68 1.437l.684 2.062c.34-2.549 1.386-3.823 3.14-3.823 1.629 0 2.444 1.131 2.444 3.394v.59l-1.97.545c-.37.1-.672.186-.903.255-.224.07-.53.174-.915.313a7.681 7.681 0 00-.939.405 8.376 8.376 0 00-.822.51c-.301.2-.54.413-.718.637a3.24 3.24 0 00-.44.776zm1.576 2.248c-.41-.371-.614-.858-.614-1.46 0-.324.066-.63.197-.915.131-.294.286-.545.463-.753.186-.209.436-.413.753-.614.317-.209.599-.375.846-.498.247-.124.568-.255.961-.394.394-.147.692-.251.892-.313.209-.062.49-.143.846-.243l.788-.232v3.87c-.966 1.405-2.124 2.108-3.476 2.108-.687 0-1.24-.186-1.656-.556z"
                        clipRule="evenodd"
                    ></path>
                    <path
                        fill="#000"
                        d="M47.271 36.502c.24-.309.398-.648.475-1.02.078-.37.116-.806.116-1.308V28.74c0-.502-.038-.935-.116-1.298a2.469 2.469 0 00-.475-1.019l1.727-.88v3.174c.633-1.074 1.297-1.889 1.992-2.445.703-.563 1.525-.845 2.467-.845.487 0 .908.061 1.263.185.363.124.649.328.857.614.217.278.387.544.51.8.131.246.22.606.266 1.077.054.463.085.834.093 1.112.016.278.023.68.023 1.204v3.754c0 .525.035.97.105 1.332a2.4 2.4 0 00.486.996h-2.34c.247-.309.406-.64.475-.996a6.52 6.52 0 00.116-1.332v-4.61c-.008-.256-.02-.503-.035-.742a4.12 4.12 0 00-.08-.707 4.958 4.958 0 00-.175-.648c-.07-.201-.166-.383-.29-.545a1.784 1.784 0 00-.44-.428 1.668 1.668 0 00-.613-.279c-.24-.07-.51-.104-.811-.104-1.398 0-2.688.927-3.87 2.78v5.283c0 .502.04.938.116 1.309.078.37.236.71.475 1.02h-2.317z"
                    ></path>
                    <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M59.448 33.131c-.115.294-.173.61-.173.95 0 .796.274 1.417.822 1.865.556.448 1.236.672 2.039.672 1.653 0 2.992-.907 4.02-2.722v2.792l1.749-.892a2.38 2.38 0 01-.475-.997 6.521 6.521 0 01-.116-1.332V30.19c0-.572-.02-1.062-.058-1.471a6.645 6.645 0 00-.255-1.275c-.123-.44-.3-.795-.532-1.065-.224-.278-.537-.506-.939-.684-.401-.177-.884-.266-1.448-.266-.942 0-1.78.2-2.514.602-.726.402-1.286.88-1.68 1.437l.684 2.062c.34-2.549 1.386-3.823 3.14-3.823 1.629 0 2.444 1.131 2.444 3.394v.59l-1.97.545c-.37.1-.672.186-.903.255-.224.07-.53.174-.915.313a7.681 7.681 0 00-.939.405 8.376 8.376 0 00-.822.51c-.301.2-.54.413-.718.637-.17.216-.317.475-.44.776zm1.576 2.248c-.41-.371-.614-.858-.614-1.46 0-.324.066-.63.197-.915.131-.294.286-.545.463-.753a3.53 3.53 0 01.753-.614c.317-.209.599-.375.846-.498a8.61 8.61 0 01.961-.394c.394-.147.691-.251.892-.313.209-.062.49-.143.846-.243l.788-.232v3.87c-.966 1.405-2.124 2.108-3.476 2.108-.687 0-1.24-.186-1.656-.556z"
                        clipRule="evenodd"
                    ></path>
                    <path
                        fill="#000"
                        d="M74.709 21.49H84.81l.59 2.942c-.408-.974-.96-1.653-1.656-2.04-.687-.386-1.575-.579-2.664-.579h-4.194v6.766h3.65c.74 0 1.324-.128 1.749-.383.425-.255.706-.672.845-1.25v3.718c-.278-1.166-1.143-1.75-2.594-1.75h-3.65v5.213c0 .657.109 1.155.325 1.495.216.332.637.498 1.263.498h3.347c1.838 0 3.136-.9 3.893-2.7l-.614 3.082H74.8c.471-.564.707-1.34.707-2.328V23.806c0-.996-.266-1.769-.8-2.317zM90.28 25.822h-3.035c.193.108.37.22.533.335.162.109.328.248.498.418.17.17.293.3.37.393.085.085.232.255.44.51.21.255.352.425.43.51.069.077.17.2.3.37.14.163.244.282.313.36l2.004 2.513-1.17 1.518c-.409.517-.853 1.066-1.332 1.645-.456.564-.83.989-1.124 1.274-.293.286-.683.564-1.17.834h2.155a.993.993 0 01-.15-.533c0-.262.088-.552.266-.868.24-.44.525-.873.857-1.298l1.854-2.351a57.526 57.526 0 012.722 3.58c.247.378.37.713.37 1.007a.87.87 0 01-.127.463h3.035a6.34 6.34 0 01-.405-.231 5.591 5.591 0 01-.382-.29 7.036 7.036 0 00-.302-.255 4.908 4.908 0 01-.324-.336 7.358 7.358 0 00-.266-.301 6.69 6.69 0 00-.313-.382 62.813 62.813 0 01-.313-.383c-.2-.224-.413-.478-.637-.764l-2.132-2.653 2.317-2.942c.433-.549.823-.977 1.17-1.286a5.66 5.66 0 011.332-.857h-2.282c.1.162.15.34.15.533 0 .254-.088.544-.266.868-.34.564-.695 1.085-1.065 1.564l-1.506 1.9c-1.09-1.336-1.958-2.514-2.607-3.533-.216-.332-.324-.63-.324-.892 0-.155.039-.301.116-.44z"
                    ></path>
                    <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M99.387 41.53a2.56 2.56 0 00.475-1.02c.077-.362.116-.799.116-1.309V28.718a6.35 6.35 0 00-.116-1.321 2.378 2.378 0 00-.475-.996l1.726-.88v2.583c.602-.873 1.232-1.537 1.888-1.993.657-.456 1.41-.683 2.259-.683 1.336 0 2.41.49 3.221 1.47.811.974 1.216 2.26 1.216 3.858a7.53 7.53 0 01-.324 2.225 6.14 6.14 0 01-.939 1.865c-.401.54-.934.973-1.598 1.297-.657.317-1.394.475-2.213.475-1.367 0-2.537-.56-3.51-1.68v4.055c0 1.236.255 2.081.765 2.537h-2.491zm1.726-10.345c0 .27.023.568.07.892.046.325.119.691.22 1.1.1.402.247.788.44 1.159.201.363.432.703.695 1.02.262.316.595.567.996.752.409.186.861.278 1.355.278.518 0 .981-.104 1.391-.312.417-.217.756-.49 1.019-.823.263-.34.483-.733.66-1.181.178-.456.302-.908.371-1.356.077-.455.116-.915.116-1.378 0-.718-.077-1.394-.232-2.027a5.866 5.866 0 00-.672-1.703 3.298 3.298 0 00-1.17-1.205 3.002 3.002 0 00-1.633-.452c-1.298 0-2.506.78-3.626 2.34v2.896zM113.371 27.026c-.95 1.058-1.425 2.422-1.425 4.09 0 1.63.456 2.954 1.367 3.973.911 1.02 2.101 1.53 3.568 1.53 1.946 0 3.406-.974 4.379-2.92-.95 1.475-2.189 2.212-3.719 2.212-.61 0-1.166-.111-1.668-.336a3.725 3.725 0 01-1.239-.891 5.689 5.689 0 01-.811-1.263 6.23 6.23 0 01-.603-2.676v-.104h8.121c.008-.108.012-.22.012-.336 0-.857-.132-1.626-.394-2.306a3.936 3.936 0 00-1.448-1.865c-.664-.47-1.479-.706-2.445-.706-1.513 0-2.745.533-3.695 1.598zm4.483 3.337l-4.657.092c.039-.556.062-.85.07-.88.162-1.213.571-2.17 1.228-2.873.656-.71 1.417-1.066 2.282-1.066.919 0 1.683.348 2.294 1.043.61.695.915 1.479.915 2.351-.023.603-.263 1.008-.719 1.217-.208.062-.679.1-1.413.116z"
                        clipRule="evenodd"
                    ></path>
                    <path
                        fill="#000"
                        d="M123.579 36.502c.394-.525.591-1.301.591-2.328V28.74c0-1.02-.197-1.792-.591-2.317l1.726-.88v2.826c.556-.919 1.143-1.637 1.761-2.155.625-.525 1.367-.787 2.224-.787 1.065 0 1.753.378 2.062 1.135l-.661 2.178c-.162-1.8-.857-2.7-2.085-2.7-1.104 0-2.205.83-3.301 2.491v5.642c0 1.027.197 1.803.591 2.328h-2.317z"
                    ></path>
                    <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M138.225 31.116c0-1.668.475-3.032 1.425-4.09.95-1.065 2.182-1.598 3.695-1.598.966 0 1.78.235 2.445.706A3.942 3.942 0 01147.238 28c.262.68.393 1.449.393 2.306 0 .116-.003.227-.011.336h-8.121v.104a6.182 6.182 0 00.603 2.676c.224.471.494.892.811 1.263.324.363.737.66 1.239.892a4.048 4.048 0 001.668.335c1.529 0 2.769-.737 3.719-2.212-.973 1.946-2.433 2.92-4.379 2.92-1.467 0-2.657-.51-3.568-1.53s-1.367-2.344-1.367-3.973zm1.251-.66l4.657-.093c.734-.016 1.205-.054 1.413-.116.456-.209.695-.614.718-1.217 0-.872-.305-1.656-.915-2.351-.61-.695-1.374-1.043-2.293-1.043-.865 0-1.626.355-2.282 1.066-.657.703-1.066 1.66-1.228 2.873-.008.03-.031.324-.07.88z"
                        clipRule="evenodd"
                    ></path>
                    <path
                        fill="#000"
                        d="M150.332 35.483c-.077.37-.235.71-.474 1.02h2.316a2.483 2.483 0 01-.475-1.02 6.511 6.511 0 01-.115-1.31v-5.282c1.181-1.853 2.471-2.78 3.869-2.78.301 0 .571.035.811.104.247.062.451.155.614.279.17.115.316.258.44.428.123.162.22.344.289.545.07.2.128.417.174.648.046.224.074.46.081.707.016.24.027.486.035.741v4.61c0 .526-.039.97-.116 1.333a2.28 2.28 0 01-.475.996h2.34a2.397 2.397 0 01-.486-.996 7.172 7.172 0 01-.105-1.332V30.42c0-.526-.007-.927-.023-1.205a12.949 12.949 0 00-.092-1.112c-.047-.471-.136-.83-.267-1.078a4.488 4.488 0 00-.51-.799 1.709 1.709 0 00-.857-.614c-.355-.123-.776-.185-1.262-.185-.943 0-1.765.282-2.468.845-.695.556-1.359 1.371-1.992 2.445v-3.174l-1.726.88c.239.309.397.649.474 1.02.078.362.116.795.116 1.297v5.433c0 .502-.038.938-.116 1.309zM161.861 30.953c0-.563.065-1.108.197-1.633a5.433 5.433 0 011.726-2.757c.424-.355.942-.637 1.552-.846a6.161 6.161 0 012.004-.312c1.413 0 2.545.37 3.394 1.112l-.625 2.351c-.348-2.154-1.375-3.232-3.082-3.232-.811 0-1.521.236-2.131.707a4.233 4.233 0 00-1.367 1.784 6.267 6.267 0 00-.44 2.375c0 .942.177 1.822.533 2.64a4.9 4.9 0 001.621 2.016c.734.533 1.584.8 2.549.8.61 0 1.205-.112 1.784-.336a3.597 3.597 0 001.483-1.112 3.86 3.86 0 01-1.587 1.575c-.672.355-1.448.533-2.329.533-.826 0-1.579-.158-2.259-.475a4.746 4.746 0 01-1.668-1.286 6.107 6.107 0 01-1.008-1.807 6.404 6.404 0 01-.347-2.097z"
                    ></path>
                    <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M174.339 27.026c-.95 1.058-1.425 2.422-1.425 4.09 0 1.63.456 2.954 1.367 3.973.911 1.02 2.101 1.53 3.568 1.53 1.946 0 3.406-.974 4.379-2.92-.95 1.475-2.19 2.212-3.719 2.212-.61 0-1.166-.111-1.668-.336a3.725 3.725 0 01-1.239-.891 5.689 5.689 0 01-.811-1.263 6.182 6.182 0 01-.603-2.676v-.104h8.121c.008-.108.011-.22.011-.336 0-.857-.131-1.626-.393-2.306a3.942 3.942 0 00-1.448-1.865c-.665-.47-1.479-.706-2.445-.706-1.513 0-2.745.533-3.695 1.598zm4.483 3.337l-4.657.092c.039-.556.062-.85.07-.88.162-1.213.571-2.17 1.228-2.873.656-.71 1.417-1.066 2.282-1.066.919 0 1.683.348 2.293 1.043.61.695.915 1.479.915 2.351-.023.603-.262 1.008-.718 1.217-.208.062-.679.1-1.413.116z"
                        clipRule="evenodd"
                    ></path>
                    <path
                        fill="#000"
                        d="M56.992 7.258h14.541v.71h-14.54v-.71zM119.748 7.258h-14.541v.71h14.541v-.71z"
                    ></path>
                </svg>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, {})(Leyla);
