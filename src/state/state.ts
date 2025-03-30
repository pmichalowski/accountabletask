import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { PersonalDetails } from "../types/PersonalDetails";

type StateProps = {
  country: string | null;
  personalDetails: PersonalDetails | null;
  profilePicture: string | null;
};

type StateActions = {
  setCountry: (country: string) => void;
  setPersonalDetails: (personalDetails: PersonalDetails | null) => void;
  setProfilePicture: (profilePicture: string | null) => void;
  resetState: () => void;
};

type State = StateProps & StateActions;

const DEFAULT_STATE: StateProps = {
  country: null,
  personalDetails: null,
  profilePicture: null,
};

const appState = create<State>()(
  immer(
    persist(
      (set) => ({
        ...DEFAULT_STATE,
        setCountry: (country) =>
          set((state) => {
            state.country = country;
          }),
        setPersonalDetails: (personalDetails) =>
          set((state) => {
            state.personalDetails = personalDetails;
          }),
        setProfilePicture: (profilePicture) =>
          set((state) => {
            state.profilePicture = profilePicture;
          }),
        resetState: () => set(DEFAULT_STATE),
      }),
      {
        name: "appState",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

// PUBLIC API

// Getter hooks
export const useCountry = (): StateProps["country"] =>
  appState((state) => state.country);

export const usePersonalDetails = (): StateProps["personalDetails"] =>
  appState((state) => state.personalDetails);

export const useProfilePicture = (): StateProps["profilePicture"] =>
  appState((state) => state.profilePicture);

// Setter hooks
export const useSetCountry = (): StateActions["setCountry"] =>
  appState((state) => state.setCountry);

export const useSetPersonalDetails = (): StateActions["setPersonalDetails"] =>
  appState((state) => state.setPersonalDetails);

export const useSetProfilePicture = (): StateActions["setProfilePicture"] =>
  appState((state) => state.setProfilePicture);

export const useResetState = (): StateActions["resetState"] =>
  appState((state) => state.resetState);
