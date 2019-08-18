import React, { Component } from "react";
import { connect } from "react-redux";
import Toastify from "reactstrap-toastify";
import { Actions as ToastifyActions } from "reactstrap-toastify";
import {
  Container,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "primary",
      title: "Hello",
      message: "World!",
      color: "primary",
      dismissable: true,
      autoClose: 0
    };
  }
  componentDidMount() {
    const { dispatch } = this.props;
    setTimeout(
      () =>
        dispatch(
          ToastifyActions.notify({
            title: "Welcome!",
            message:
              "Example application UP & Running, dismiss this message by yourself bro!",
            color: "success",
            icon: "success",
            dismissable: true
          })
        ),
      500
    );
  }

  handleInputChange(propName, evt) {
    this.setState({
      [propName]:
        propName === "autoClose"
          ? parseFloat(evt.target.value)
          : evt.target.value
    });
  }
  handleCheckboxChange(propName, evt) {
    this.setState({
      [propName]: evt.target.checked
    });
  }

  handleSubmit() {
    const { dispatch } = this.props;
    dispatch(ToastifyActions.notify(this.state));
  }

  render() {
    const colors = ["primary", "secondary", "danger", "warning", "info"];
    return (
      <React.Fragment>
        <Container className="mt-3">
          <h1 className="display-1 border-bottom">reactstrap-toastify</h1>
          <p className="lead">
            basic notification system based on reactstrap UX.
          </p>
          <Row>
            <Col lg={4}>
              <Form>
                <Card>
                  <CardHeader>Test it!</CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label>Icon</Label>
                      <Input
                        type="select"
                        value={this.state.icon}
                        onChange={this.handleInputChange.bind(this, "icon")}
                      >
                        {colors.map(c => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Title</Label>
                      <Input
                        type="text"
                        value={this.state.title}
                        onChange={this.handleInputChange.bind(this, "title")}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Message</Label>
                      <Input
                        type="textarea"
                        value={this.state.message}
                        onChange={this.handleInputChange.bind(this, "message")}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Icon</Label>
                      <Input
                        type="select"
                        value={this.state.color}
                        onChange={this.handleInputChange.bind(this, "color")}
                      >
                        {colors.map(c => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Autoclose</Label>
                      <Input
                        type="number"
                        value={this.state.autoClose}
                        onChange={this.handleInputChange.bind(
                          this,
                          "autoClose"
                        )}
                      />
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          value={this.state.dismissable}
                          onChange={this.handleCheckboxChange.bind(
                            this,
                            "dismissable"
                          )}
                        />
                        Dismissable
                      </Label>
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    <Button
                      color="primary"
                      onClick={this.handleSubmit.bind(this)}
                    >
                      Submit
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
        <Toastify />
      </React.Fragment>
    );
  }
}

export default connect(state => ({ state }))(App);
