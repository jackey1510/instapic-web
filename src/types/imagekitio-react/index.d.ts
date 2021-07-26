declare module "imagekitio-react" {
  export function IKImage(props: IKImageProps): React.FC<IKImageProps, any>;
  export function IKContext(
    props: IKContextProps
  ): React.FC<IKContextProps, any>;
  export function IKUpload(props: IKUploadProps): React.FC<IKUploadProps, any>;
  export interface IKImageProps {
    urlEndpoint?: string;
    path: string;
    transformation?: {
      [{
        height: string,
        width: string,
      }];
    };
  }

  export interface IKContextProps {
    publicKey: string;
    urlEndpoint: string;
    transformationPosition: string;
    authenticationEndpoint?: string;
    children?: any;
  }

  export interface IKUploadProps {
    fileName: string;
  }
}
