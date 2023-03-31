import { create } from "zustand";

interface TextureState {
  texture: THREE.Texture | null;
  setTexture: (texture: THREE.Texture) => void;
}
export const useTextureStore = create<TextureState>()((set) => ({
  texture: null,
  setTexture: (texture) => set(() => ({ texture })),
}));
