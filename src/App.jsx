import ThemeSwitcher from "./components/themeSwitcher";

export default function App() {
  return (
    <div className="App">
      <ThemeSwitcher
        render={({
          theme,
          themeColor,
          switchedButtonStyle,
          containerBorderStyle,
        }) => (
          <div className="box">
            <h1>Display Theme is {theme}</h1>
            <div className="div_container" style={containerBorderStyle}>
              <div className="icons_divs">
                <div className="light_side">
                  <img
                    className="img_icons"
                    src="https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-01-256.png"
                    alt=""
                  />
                </div>
                <div className="dark_side">
                  <img
                    className="img_icons"
                    src="https://cdn4.iconfinder.com/data/icons/onboarding-material-color/128/__20-256.png"
                    alt=""
                  />
                </div>
              </div>
              <button
                style={switchedButtonStyle}
                className="switcher_btn"
                onClick={themeColor}
              ></button>
            </div>
          </div>
        )}
      />
    </div>
  );
}
