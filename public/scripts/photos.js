const PhotosUpload ={
    input:"",
    preview :document.querySelector("#photos-preview"),
    uploadLimit:6,
    files: [],
    handleFileInput(event){
        const{files:fileList} = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file =>{

            PhotosUpload.files.push(file)

            const reader =new FileReader()

            reader.onload =() =>{
                const image = new Image()
                image.src = String(reader.result)

                const div =PhotosUpload.getContainer(image)
                PhotosUpload.preview.appendChild(div)

            }

            reader.readAsDataURL(file)
        })
        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },

    hasLimit(event){
        const {uploadLimit,input, preview} = PhotosUpload
        const {files:fileList} = input
           if(fileList.length > uploadLimit){
            alert(`Envie no Maximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        const PhotosDiv=[]
        preview.childNodes.forEach(item =>{
            if(item.classList && item.classList.value == "photo"){
                PhotosDiv.push(item)
            }
        })

        const totalPhotos = fileList.length + PhotosDiv.length
        if(totalPhotos > uploadLimit){
            alert("Voce atingiu o limite maximo de fotos")
            event.preventDefault()
            return true
        }
        return false
    },

    getAllFiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },

    getContainer(image){
        const container = document.createElement('div')
        container.classList.add("photo")

        container.onclick = PhotosUpload.removePhoto

        container.appendChild(image)

        container.appendChild(PhotosUpload.getRemoveButton())
        
        return container

    },

    getRemoveButton(){
        const button = document.createElement("i")
        button.classList.add('material-icons')
        button.innerHTML ="close"
        return button
    },

    removePhoto (event){
        const photosDiv = event.target.parentNode //div class= "photo"
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photosDiv)

        PhotosUpload.files.splice(index,1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photosDiv.remove()

    },

    removeOldPhoto(event){
        const photoDiv = event.target.parentNode
        if(photoDiv.id){
            const removedFiles= document.querySelector('input[name="removed_files"')
            if(removedFiles){
                removedFiles.value += `${photoDiv.id},`
            }
        }
        photoDiv.remove()
    }

}

    const ImageGallery ={
        highlight:document.querySelector(" .highlight>img"),
        previews:document.querySelectorAll(".container-img img"),
        setImage(e){
            const {target} = e

            ImageGallery.previews.forEach(preview=>preview.classList.remove("active"))
            target.classList.add("active")

            ImageGallery.highlight.src = target.src
            lightbox.image.src =target.src

        },
    }

    const lightbox={
        target:document.querySelector(".lightbox-target"),
        image:document.querySelector(".lightbox-target img"),
        open(){
            lightbox.target.style.opacity = 1
            lightbox.target.style.top = 0
            lightbox.target.style.bottom = 0
            lightbox.closeButton.style.top = 0
        },
        close(){
            lightbox.target.style.opacity = 0
            lightbox.target.style.top = "-100%"
            lightbox.target.style.bottom = "initial"
            lightbox.closeButton.style.top = "-80px"

        }
    }