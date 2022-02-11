import { createContext } from 'react';

export const MemberContext = createContext({
  memberCheckout: ['member 1', 'member 2'],
  setMemberCheckout: () => {}
});
