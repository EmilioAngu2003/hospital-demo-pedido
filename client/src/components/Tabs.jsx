import { useState } from "react";
import Container from "./Container";
import OrderForm from "./OrderForm";

const Tabs = ({ templates, shifts }) => {
  const [activeTab, setActiveTab] = useState(templates[0].id);

  return (
    <>
      <div className="border-b border-default">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {templates.map((t) => (
            <li className="me-2" key={t.id}>
              <button
                onClick={() => setActiveTab(t.id)}
                className={`inline-block p-4 rounded-t-base ${
                  activeTab === t.id
                    ? "text-brand bg-neutral-secondary-soft"
                    : "hover:bg-neutral-secondary-soft hover:text-heading"
                }`}
              >
                {t.service}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {templates.map((t) => (
        <div
          key={t.id}
          className={`rounded-b-base bg-neutral-secondary-soft ${
            t.id === activeTab ? "block" : "hidden"
          }`}
        >
          <Container>
            <OrderForm template={t} service={t.service} shifts={shifts} />
          </Container>
        </div>
      ))}
    </>
  );
};

export default Tabs;
