import { BiUserCircle } from 'react-icons/bi';
import Mailto from '@/Components/Shared/Mailto';
import * as PropTypes from 'prop-types';
import React from 'react';
import { FaRegMap } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';

function ClientInfo({ name, type, contacts, address }) {
  return (
    <div className="flex flex-4 flex-col pt-8 pb-14 px-10 justify-center bg-white items-center rounded-lg">
      <BiUserCircle
        size={40}
        className="flex justify-center items-center mb-10"
      />
      <span className="text-xl font-bold">{name}</span>
      <span>{type}</span>
      <div className="flex flex-col py-2 text-center">
        <span>{contacts[0]?.email ?? 'No email yet'}</span>
        <span>{address ?? 'No Address yet'}</span>
      </div>
      <div className="flex items-center gap-3 border border-[#00B4AD] px-6 py-2 mb-4 rounded-lg">
        <FaRegMap size={20} />
        <span className="text-[#00B4AD]">Location</span>
      </div>
      <div className="flex items-center gap-2 border border-[#00B4AD] px-14 py-2 rounded-lg">
        <CiMail size={20} />
        <Mailto email={contacts[0]?.email}>Email</Mailto>
      </div>
    </div>
  );
}

ClientInfo.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  contacts: PropTypes.any,
  address: PropTypes.any,
};

export default ClientInfo;
