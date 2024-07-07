import React, {useState} from 'react'
import './Filter.css'
import { Dropdown, DropdownButton } from 'react-bootstrap';

function Filter({defult, optionTitle, options, Filterstyle, dropdrowStyle, onSelect}) {
    const [title, setTitle] = useState(defult)
    const handleSelect = (eventKey) => {
        setTitle(eventKey);
        if (onSelect) {
          onSelect(eventKey);
        }
      };
    return (
        <div className={`${Filterstyle}`}>
          <DropdownButton
            id="dropdown-basic-button"
            title={<span className="fs-7 dropdownTitle ">{optionTitle}: <p className="">{title}</p></span> }
            variant="none"
            className={`shadow-sm rounded-pill filterContainer ${dropdrowStyle} `}
            onSelect={ handleSelect}
          >
            {options? options.map((option) => (
                <Dropdown.Item eventKey={option.type} key={option.pk}>{option.type}</Dropdown.Item>
            )): <Dropdown.Item eventKey='None'>None</Dropdown.Item>
                }
          </DropdownButton>
        </div>
      );
}

export default Filter

