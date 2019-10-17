import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { hashHistory } from "react-router";
import { Modal, Alert, Form } from "react-bootstrap";

const emailRegex = /[^@]+@[^@]+\.[a-zA-Z]{2,6}/;
export default class Editar extends Component {
  Url = "http://localhost:8080/Funcionarios";
  state = {
    funcionarios: [],
    message: {
      text: "",
      alert: ""
    }
  };
  state = {
    validated: false,
    model: {
      nome: "",
      sobrenome: "",
      email: "",
      numeroPIS: ""
    }
  };

  setValue = (e, field) => {
    const { model } = this.state;
    if (field === "numeroPIS") model[field] = e.target.value.replace(/\D/g, "");
    else model[field] = e.target.value;
    this.setState({ model });
    console.log(this.state.model);
  };

  salvar = () => {
    const { model: funcionario } = this.state;
    let hasError = false;
    if (
      funcionario.nome === "" ||
      funcionario.nome == null ||
      funcionario.nome.length < 2 ||
      funcionario.nome.length > 30 ||
      funcionario.sobrenome === "" ||
      funcionario.sobrenome == null ||
      funcionario.sobrenome.length < 2 ||
      funcionario.sobrenome.length > 50 ||
      funcionario.numeroPIS === "" ||
      funcionario.numeroPIS == null ||
      funcionario.numeroPIS.length < 11 || 
      funcionario.numeroPIS.length > 11 ||
      !emailRegex.test(funcionario.email)
    ) {
      hasError = true;
    }
    if (hasError) {
      alert("Algum campo vazio ou foi preenchido incorretamente.");
    } else {
      this.setState({
        model: { nome: "", sobrenome: "", email: "", numeroPIS: "" }
      });
      this.save(this.state.model);
    }
    this.setState({ validated: true });
  };

  save = funcionario => {
    let data = {
      nome: funcionario.nome,
      sobrenome: funcionario.sobrenome,
      email: funcionario.email,
      numeroPIS: funcionario.numeroPIS
    };
    const requestInfo = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-type": "application/json"
      })
    };
    fetch(this.Url + "/" + this.props.params.id, requestInfo).then(response =>
      response.json()
    );
    this.showSuccessModal();
  };

  showCancelModal = () => {
    this.setState(
      {
        handleModalClose: () => {
          this.setState({ showModal: false });
        },
        modalTitle: "Confirmação",
        modalBody: (
          <Alert variant="danger">
            Tem certeza que deseja cancelar? Dados alterados não serão salvos.
          </Alert>
        ),
        modalCloseText: "Não",
        modalConfirmText: "Sim",
        modalOnlyClose: false,
        handleModalConfirm: () => {
          this.setState({ showModal: false }, () => {
            hashHistory.push("/Listar");
          });
        }
      },
      () => this.setState({ showModal: true })
    );
  };

  showSuccessModal = () => {
    this.setState(
      {
        handleModalClose: () => {
          this.setState({ showModal: false }, () => {
            hashHistory.push("/Listar");
          });
        },
        modalTitle: "Sucesso",
        modalBody: "Funcionario atualizado com sucesso",
        modalCloseText: "OK",
        modalConfirmText: "OK",
        modalOnlyClose: true,
        handleModalConfirm: () => {
          this.setState({ showModal: false });
        }
      },
      () => this.setState({ showModal: true })
    );
  };

  componentWillMount() {
    const id = this.props.params.id;
    fetch(this.Url + "/" + id)
      .then(response => response.json())
      .then(funcionario => this.setState({ model: funcionario }))
      .catch(e => console.log(e));
  }
  render() {
    return (
      <div>
        <Button color="danger" onClick={this.showCancelModal}>
          Voltar
        </Button>
        <fieldset
          className="rounded p-3 pr-4 m-1"
          style={{ border: "1px solid #ddd" }}
        >
          <legend
            style={{
              marginLeft: 5,
              width: "auto",
              fontSize: 18,
              fontWeight: "bold"
            }}
          >
            Cadastro de Funcionário
          </legend>
          <Form noValidate validated={this.state.validated}>
            <FormGroup>
              <div className="form-row">
                <div className="col-md-6">
                  <Label for="nome">Nome:</Label>
                  <Input
                    id="nome"
                    type="text"
                    value={this.state.model.nome}
                    placeholder="Primeiro nome"
                    required
                    minLength={2}
                    maxLength={30}
                    onChange={e => this.setValue(e, "nome")}
                  />
                </div>
                <div className="col-md-6">
                  <Label for="sobrenome">Sobrenome:</Label>
                  <Input
                    id="sobrenome"
                    type="text"
                    required
                    minLength={2}
                    maxLength={50}
                    value={this.state.model.sobrenome}
                    placeholder="Sobrenome completo"
                    onChange={e => this.setValue(e, "sobrenome")}
                  />
                </div>
              </div>
            </FormGroup>
            <FormGroup>
              <div className="form-row">
                <div className="col-md-6">
                  <Label for="email">Email:</Label>
                  <Input
                    id="email"
                    type="text"
                    value={this.state.model.email}
                    required
                    pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                    placeholder="Email"
                    onChange={e => this.setValue(e, "email")}
                  />
                </div>
                <div className="col-md-6">
                  <Label for="numeroPIS">Número PIS:</Label>
                  <Input
                    id="numeroPIS"
                    required
                    minLength={11}
                    maxLength={11}
                    value={this.state.model.numeroPIS}
                    placeholder="Número PIS"
                    onChange={e => this.setValue(e, "numeroPIS")}
                  />
                </div>
              </div>
            </FormGroup>
            <Button
              style={{ float: "right" }}
              color="success"
              onClick={this.salvar}
            >
              Salvar
            </Button>
          </Form>
        </fieldset>
        <Modal show={this.state.showModal} onHide={this.state.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.modalBody}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.state.handleModalClose}>
              {this.state.modalCloseText}
            </Button>
            {this.state.modalOnlyClose !== true ? (
              <Button variant="primary" onClick={this.state.handleModalConfirm}>
                {this.state.modalConfirmText}
              </Button>
            ) : null}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
