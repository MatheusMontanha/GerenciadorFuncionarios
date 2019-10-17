import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import { hashHistory } from "react-router";
import { Modal, Alert } from "react-bootstrap";

export default class Listar extends Component {
  Url = "http://localhost:8080/Funcionarios";

  state = {
    funcionarios: [],
    message: {
      text: "",
      alert: ""
    },
    editModel: {
      id: "",
      nome: "",
      sobrenome: "",
      email: "",
      numeroPIS: ""
    }
  };
  componentDidMount() {
    fetch(this.Url)
      .then(response => response.json())
      .then(funcionarios => this.setState({ funcionarios }))
      .catch(e => console.log(e));
  }

  deletar = id => {
    fetch(`${this.Url}/${id}`, { method: "DELETE" })
      .then(response => response.json())
      .then(rows => {
        const funcionarios = this.state.funcionarios.filter(
          funcionario => funcionario.idFuncionario !== id
        );
        this.setState({
          funcionarios,
          message: {
            text: "Funcionário excluido com sucesso!",
            alert: "info"
          }
        });
      })
      .catch(e => console.log(e));
  };
  showCancelModal = id => {
    this.setState(
      {
        handleModalClose: () => {
          this.setState({ showModal: false });
        },
        modalTitle: "Confirmação",
        modalBody: (
          <Alert variant="danger">Tem certeza que deseja deletar?</Alert>
        ),
        modalCloseText: "Não",
        modalConfirmText: "Sim",
        modalOnlyClose: false,
        handleModalConfirm: () => {
          this.setState({ showModal: false }, () => {
            fetch(`${this.Url}/${id}`, { method: "DELETE" })
              .then(response => response.json())
              .then(rows => {
                const funcionarios = this.state.funcionarios.filter(
                  funcionario => funcionario.idFuncionario !== id
                );
                this.setState({
                  funcionarios,
                  message: {
                    text: "Funcionário excluido com sucesso!",
                    alert: "info"
                  }
                });
              })
              .catch(e => console.log(e));
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
            hashHistory.push("/");
          });
        },
        modalTitle: "Sucesso",
        modalBody: "Funcionario cadastrado com sucesso",
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

  render() {
    return (
      <div>
        <Button color="danger" onClick={() => hashHistory.push("/")}>
          Voltar
        </Button>
        <Table
          className="table-bordered text-center"
          style={{ padding: "1px" }}
        >
          <thead className="thead-dark">
            <tr>
              <th>Nome Completo</th>
              <th>Email</th>
              <th>Número PIS</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {this.state.funcionarios.map(funcionario => (
              <tr key={funcionario.idFuncionario}>
                <td>
                  {funcionario.nome} {funcionario.sobrenome}
                </td>
                <td>{funcionario.email}</td>
                <td>{funcionario.numeroPIS}</td>
                <td>
                  <Button
                    color="info"
                    size="sm"
                    onClick={() =>
                      hashHistory.push("/Editar/" + funcionario.idFuncionario)
                    }
                  >
                    Editar
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={e =>
                      this.showCancelModal(funcionario.idFuncionario)
                    }
                  >
                    Deletar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
