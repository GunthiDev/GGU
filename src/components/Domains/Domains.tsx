import { useEffect, useState } from "react";
import "./Domains.scss";
import Modal from "../Modal/Modal";
import DeleteIcon from "../../assets/trash.svg";
import IssueBoardIcon from "../../assets/column.svg";
import Title from "../Title/Title";

const Domains: React.FC = () => {
  const [domains, setDomains] = useState<
    { domain: string; issueBoard: string }[]
  >([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    chrome.storage.local.get("domains", (result) => {
      setDomains(result.domains ? result.domains : []);
    });
  }, [showModal]);

  const navigateToUrl: (url: string) => void = (url) => {
    chrome.tabs.create({
      url: `https://${url}`,
    });
  };

  const deleteDomain: (entry: {
    domain: string;
    issueBoard: string;
  }) => void = (entry) => {
    const filteredDomains = domains.filter(
      (e) => !(e.domain === entry.domain && e.issueBoard === entry.issueBoard)
    );

    setDomains(filteredDomains);
    chrome.storage.local.set({ domains: filteredDomains });
  };

  return (
    <div className="container domain-wrapper">
      <Title title="Domains" />
      {showModal && <Modal setShowModal={setShowModal} domains={domains} />}
      <div className="domain-container">
        <div className="domains">
          {domains.length > 0 &&
            domains.map((e) => (
              <div className="domain" key={e.domain}>
                <button
                  className="domain-button"
                  onClick={() => navigateToUrl(e.domain)}
                >
                  {e.domain}
                </button>
                {e.issueBoard !== "" && (
                  <button
                    className="action-button"
                    onClick={() => navigateToUrl(e.issueBoard)}
                  >
                    <img alt="issue board icon" src={IssueBoardIcon} />
                  </button>
                )}
                <button
                  className="action-button"
                  onClick={() => deleteDomain(e)}
                >
                  <img alt="delete icon" src={DeleteIcon} />
                </button>
              </div>
            ))}
          {domains.length === 0 && (
            <div className="domains">
              <p>No domains were provided</p>
            </div>
          )}
        </div>
        <button onClick={() => setShowModal(true)}>+</button>
      </div>
    </div>
  );
};

export default Domains;
