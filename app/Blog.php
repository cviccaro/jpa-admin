<?php 
namespace App;

use App\BlogCategory;
use App\Image;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model {

	protected $fillable = ["title", "description", "body", "category", "image", "created_at", "updated_at"];

	protected $dates = [];

	public static $rules = [
		"title" => "required",
	];

	public function getCategoryAttribute() {
		return BlogCategory::where('id', $this->attributes['category'])->first()->name;
	}
	public function getImageAttribute() {
		if ($this->attributes['image'] !== NULL) {
			return Image::where('id', $this->attributes['image'])->first()->path;	
		}
		return $this->attributes['image'];
	}
}
