import React from "react";
import { connect } from "react-redux";
import { Toast, ToastHeader, ToastBody } from "reactstrap";
import "./styles.css";

class Toaster extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closed: [],
      visible: []
    };
  }
  componentDidMount() {
    this.scheduleAutoCloseAndBackground();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.state.toast.queue.length !== this.props.state.toast.queue.length
    ) {
      this.scheduleAutoCloseAndBackground();
    }
  }
  scheduleAutoCloseAndBackground() {
    const { state } = this.props;
    const { toast } = state;
    const { queue } = toast;
    const itemsWithAutoClose = queue.filter(
      item => item.autoClose > 0 && item.isOpen === true
    );

    itemsWithAutoClose.forEach(item => {
      setTimeout(() => this.handleToggle(item), item.autoClose);
    });

    setTimeout(
      () =>
        this.setState({
          visible: queue
        }),
      250
    );
  }

  handleToggle(item) {
    this.setState(
      {
        visible: this.state.visible.filter(v => v !== item)
      },
      () =>
        setTimeout(
          () =>
            this.setState({
              closed: this.state.closed.concat(item)
            }),
          300
        )
    );
  }

  render() {
    const { state } = this.props;
    const { toast } = state;
    const { queue } = toast;
    return (
      <div className="toastify-notification-list mr-2 mb-0">
        {queue.map((item, idx) => this.renderToast(item, idx))}
      </div>
    );
  }
  renderToast(item, idx) {
    const title = typeof item.title === "function" ? item.title() : item.title;
    const message =
      typeof item.message === "function" ? item.message() : item.message;
    const isOpen = this.state.closed.indexOf(item) === -1 && item.isOpen;
    const isVisible = this.state.visible.indexOf(item) !== -1;
    const className = isVisible ? `bg-${item.color}` : "";
    return (
      <div
        key={idx}
        className={`toastify-notification-item rounded ${className} b-0 mb-1`}
      >
        <Toast isOpen={isOpen}>
          <ToastHeader
            icon={item.icon}
            toggle={
              item.dismissable ? this.handleToggle.bind(this, item) : undefined
            }
          >
            {title}
          </ToastHeader>

          <ToastBody>{message}</ToastBody>
        </Toast>
      </div>
    );
  }
}

export default connect(state => ({ state }))(Toaster);
