
import { Modal, Button } from 'rsuite';
import SearchResults from './SearchResults';

export default function SearchResultsModal({ open, onClose, results }) {
  return (
    <Modal open={open} onClose={onClose} size="lg" backdrop="static" keyboard={true}>
      <Modal.Header>
        <Modal.Title style={{ color: '#DB3A06', fontSize: '24px', fontWeight: 'bold' }} className="text-2xl font-bold text-center w-full bebas-font">Search Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SearchResults results={results} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} appearance="primary" style={{ backgroundColor: '#DB3A06' }}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
