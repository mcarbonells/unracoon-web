import { GeneralResponse } from './general-response.model';

export interface Perfil {
    id?: number;
    nombre?: string;
    segundoNombre?: string;
    apellido?: string;
    segundoApellido?: string;
    email?: string;
    constrasena?: string;
    estado?: Boolean;
    ubicacion?: string;
    descripcion?: string;
}

export interface PerfilData {
    allPerfiles: Perfil[];
    profileById: Perfil;
    createProfile: Perfil;
    updateProfile: Perfil;
    updateProfilePassword: Perfil;
    deleteProfile: Perfil;
}

export interface ProfileResponse extends GeneralResponse {
    data: PerfilData;
}