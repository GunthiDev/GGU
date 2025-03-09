import { ChangeEvent, useState } from "react";
import "./Modal.scss";

const Modal: React.FC<{
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  domains: { domain: string; issueBoard: string }[];
}> = ({ setShowModal, domains }) => {
  const [domain, setDomain] = useState<string>("");
  const [issueBoard, setIssueBoard] = useState<string>("");

  const updateDomain: (e: ChangeEvent) => void = (e) => {
    const inputElement = e.target as HTMLInputElement;
    setDomain(inputElement.value ?? "");
  };

  const updateIssueBoard: (e: ChangeEvent) => void = (e) => {
    const inputElement = e.target as HTMLInputElement;
    setIssueBoard(inputElement.value ?? "");
  };

  const saveEntry: () => void = () => {
    if (!domain) return;
    domains = domains.filter((e) => e.domain !== "");
    domains.push({
      domain: domain.replace(/https?:\/\//g, ""),
      issueBoard: issueBoard.replace(/https?:\/\//g, ""),
    });
    chrome.storage.local.set({ domains }, () => {
      setShowModal(false);
    });
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <p>
          Domain: <span className="red">*</span>
        </p>
        <p>
          <input
            id="domain"
            onChange={updateDomain}
            type="text"
            placeholder="git.example.com"
            required
          ></input>
        </p>
        <p>Issue board:</p>
        <p>
          <input
            id="issue-board"
            onChange={updateIssueBoard}
            type="text"
            placeholder="git.example.com/groups/a/-/boards"
          ></input>
        </p>
        <p className="flex-row">
          <button className="cancel" onClick={() => setShowModal(false)}>
            CANCEL
          </button>
          <button className="add" type="submit" onClick={() => saveEntry()}>
            ADD
          </button>
        </p>
      </div>
    </div>
  );
};

export default Modal;
