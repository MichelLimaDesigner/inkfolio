import { Input } from "@nextui-org/react"

type FilesForm = {
  handleFiles: (files: FileList | null) => void
}

const PostFilesForm: React.FC<FilesForm> = ({handleFiles}: FilesForm) => {
  return (
    <div className='text-center flex flex-col gap-4 p-8 rounded-lg border'>
      <h1 className='font-bold text-2xl mb-8'>Criar nova publicação</h1>
      <h2>Arrastes as fotos e vídeos aqui</h2>

      <label htmlFor='files' className='w-full py-4 rounded-lg block text-white cursor-pointer text-center bg-primary'>
        Selecione do computador
      </label>

      <Input
        name='urls'
        type='file'
        id='files'
        onChange={(e) => handleFiles(e.target.files)}
        multiple
        className='hidden'
      />
    </div>
  )
}

export default PostFilesForm