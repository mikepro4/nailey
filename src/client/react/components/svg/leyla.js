import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames"

class Leyla extends Component {
	render() {
		return (
			<div className="svg-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="122"
                    height="58"
                    fill="none"
                    viewBox="0 0 122 58"
                >
                    <path
                        fill="#000"
                        d="M.059 43c.847-.949 1.402-1.927 1.665-2.937.282-1.009.423-2.28.423-3.814V10.517c0-1.575-.13-2.866-.393-3.875C1.492 5.632.926 4.674.059 3.766h7.81c-.888.928-1.463 1.897-1.725 2.906-.263.989-.394 2.27-.394 3.845v25.61c0 2.12.272 3.634.817 4.542C7.132 41.557 8.182 42 9.716 42h7.568c4.864 0 8.275-2.331 10.233-6.993L25.912 43H.06zM31.604 28.923c0-4.36 1.24-7.922 3.723-10.687 2.483-2.785 5.702-4.177 9.657-4.177 2.523 0 4.652.615 6.388 1.846 1.756 1.231 3.017 2.856 3.784 4.874.686 1.776 1.03 3.785 1.03 6.025 0 .302-.01.595-.03.878H34.933v.272c0 1.07.11 2.17.333 3.3.242 1.21.655 2.442 1.24 3.693a14.897 14.897 0 002.12 3.3c.848.949 1.927 1.726 3.24 2.331 1.311.585 2.764.878 4.359.878 3.996 0 7.235-1.927 9.717-5.782-2.543 5.086-6.357 7.629-11.443 7.629-3.835 0-6.943-1.332-9.324-3.996-2.382-2.664-3.573-6.126-3.573-10.384zm3.269-1.726l12.17-.242c1.917-.04 3.148-.141 3.693-.303 1.191-.545 1.817-1.604 1.877-3.178 0-2.281-.797-4.33-2.391-6.146-1.595-1.816-3.593-2.724-5.995-2.724-2.26 0-4.248.928-5.963 2.785-1.716 1.836-2.786 4.339-3.21 7.508-.02.08-.08.847-.181 2.3zM57.154 15.088h7.599c-.525.585-.878 1.21-1.06 1.877a3.898 3.898 0 00-.181 1.18c0 .344.04.697.12 1.06.162.807.334 1.504.515 2.089.202.565.515 1.332.939 2.3l7.568 17.68 8.416-17.86c.929-1.918 1.393-3.583 1.393-4.996 0-1.332-.404-2.442-1.211-3.33h5.389a5.87 5.87 0 00-.545.484 5.664 5.664 0 00-.515.606c-.161.242-.313.464-.454.666-.121.181-.283.444-.484.787-.182.343-.333.615-.454.817-.101.202-.263.535-.485 1l-.454.998c-.1.222-.283.616-.545 1.181-.262.565-.454.969-.575 1.21L69.597 49.449a235.9 235.9 0 01-.818 1.665c-.12.303-.373.808-.757 1.514-.383.706-.686 1.2-.908 1.483-.202.283-.504.666-.908 1.15-.404.485-.777.818-1.12 1a6.529 6.529 0 01-1.241.545 4.035 4.035 0 01-1.484.272 6.322 6.322 0 01-2.119-.363v-3.966c.303.444.767.848 1.393 1.211.625.383 1.342.575 2.15.575.867 0 1.674-.333 2.421-.999.747-.666 1.524-1.867 2.331-3.602l2.482-5.328-9.475-21.949-.636-1.483c-.303-.727-.514-1.231-.636-1.514a20.572 20.572 0 00-.605-1.241c-.262-.545-.505-.969-.727-1.271a11.812 11.812 0 00-.787-1.03 9.699 9.699 0 00-.999-1.03zM88.82 43a6.448 6.448 0 001.242-2.664c.201-.969.302-2.11.302-3.421V9.094c0-1.312-.1-2.452-.303-3.421a6.448 6.448 0 00-1.24-2.664L93.33.708v36.207c0 1.312.101 2.452.303 3.42A6.448 6.448 0 0094.875 43H88.82zM98.992 36.673c0-.888.152-1.716.454-2.483.323-.787.707-1.463 1.151-2.028.464-.585 1.09-1.14 1.877-1.665a21.816 21.816 0 012.149-1.332c.646-.343 1.463-.696 2.452-1.06a60.017 60.017 0 012.392-.817 93.183 93.183 0 012.361-.666l5.147-1.423v-1.544c0-5.913-2.13-8.87-6.388-8.87-4.581 0-7.316 3.33-8.204 9.99l-1.786-5.388c1.029-1.453 2.492-2.705 4.389-3.754 1.918-1.05 4.107-1.574 6.57-1.574 1.473 0 2.734.232 3.784.696 1.049.464 1.867 1.06 2.452 1.786.605.706 1.07 1.635 1.393 2.785.343 1.15.565 2.26.666 3.33.1 1.07.151 2.352.151 3.845v8.567c0 1.373.101 2.533.303 3.482a6.216 6.216 0 001.241 2.603l-4.571 2.331v-7.296c-2.685 4.743-6.186 7.115-10.505 7.115-2.099 0-3.875-.586-5.328-1.756-1.433-1.17-2.15-2.795-2.15-4.874zm2.967-.424c0 1.574.535 2.846 1.604 3.814 1.09.97 2.533 1.454 4.33 1.454 3.531 0 6.559-1.837 9.082-5.51V25.896l-2.059.605c-.928.262-1.665.474-2.21.636-.525.161-1.302.434-2.331.817-1.029.363-1.867.706-2.513 1.03-.646.322-1.382.756-2.21 1.301-.827.525-1.483 1.06-1.967 1.605-.465.545-.868 1.2-1.211 1.967a5.662 5.662 0 00-.515 2.392z"
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
