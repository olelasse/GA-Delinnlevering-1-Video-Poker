.container {
  max-width: 860px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.gameHeading {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.topBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  color: #111827;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  flex-wrap: wrap;
  gap: 0.75rem;
}

.topBarActions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.toggleTableBtn {
  background-color: #004879;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 0.45rem 0.9rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.toggleTableBtn:hover {
  background-color: #003254;
}

.tableDrawer {
  width: 100%;
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tableDrawerOpen {
  grid-template-rows: 1fr;
}

.drawerInner {
  overflow: hidden;
  width: 100%;
}

.notice {
  background-color: #ffffff;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
}

.handSection {
  width: 100%;
  display: flex;
  justify-content: center;
}

.cardGrid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.controls {
  display: flex;
  gap: 1rem;
}

.primaryButton {
  padding: 0.85rem 2.8rem;
  background-color: #0f2b6b;
  color: #ffffff;
  font-size: 1.15rem;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: background-color 0.15s ease, transform 0.1s ease;
}

.primaryButton:hover:not(:disabled) {
  background-color: #1a1a5e;
  transform: translateY(-1px);
}

.primaryButton:disabled {
  background-color: #6b7280;
  cursor: not-allowed;
  box-shadow: none;
}