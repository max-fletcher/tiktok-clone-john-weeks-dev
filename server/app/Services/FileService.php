<?php

namespace App\Services;

use Image;

class FileService
{
    public function updateImage($model, $request){
        $image = Image::make($request->file('image'));

        // IF MODEL CONTAIN IMAGE. SAME AS isset($model->image)
        if(!empty($model->image)){
            $currentImage = public_path() . $model->image;

            if(file_exists($currentImage) && $currentImage != public_path() . '/user-placeholder.png'){
                unlink($currentImage);
            }
        }

        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();

        $image->crop(
            $request->width,
            $request->height,
            $request->left,
            $request->top,
        );

        $name = time() . '.' . $extension;
        $image->save(public_path() . '/files/' . $name);
        $model->image = '/files/' . $name;

        return $model;
    }

    public function addVideo($model, $request)
    {
        $video = $request->file('video');
        $extension = $video->getClientOriginalExtension();
        $name = time() . '.' . $extension;
        $dir = $video->storeAs('files', $name, 'public_files');
        $model->video =  $dir;

        return $model;
    }
}