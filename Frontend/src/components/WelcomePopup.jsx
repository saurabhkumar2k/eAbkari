import React, { Component } from "react";

class WelcomePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
    };

    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    // Same behavior as useEffect(() => { setShowPopup(true); }, [])
    this.setState({ showPopup: true });
  }

  closePopup() {
    this.setState({ showPopup: false });
  }

  render() {
    if (!this.state.showPopup) {
      return null;
    }

    return (
      <div className="popup-overlay">
        <div className="popup-box">
          <h2 style={{ fontSize: "43px", fontWeight: "bold" }}>
            Welcome to Department of Excise
          </h2>

          <p>
            <strong>Helpdesk Landline Numbers:</strong><br />
            011-23370705, 011-23379752
          </p>

          <p>
            <strong>Email:</strong><br />
            helpdesk-delhiexcise@delhi.gov.in
          </p>

          <p className="notice-text">
            “It is informed that excise department is not granting any new dealer
            registration and also not renewing any old dealer registration, till
            further order.”
          </p>

          <button onClick={this.closePopup}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default WelcomePopup;


