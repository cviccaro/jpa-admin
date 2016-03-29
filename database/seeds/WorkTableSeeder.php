<?php

use App\Client;
use App\Image;
use App\Work;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkTableSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run() {
		DB::table('work')->truncate();

		$factory = Faker\Factory::create();

		$seeds = array(
			'Innovations Catalog' => 'Kennametal',
			'2014 Print Contest' => 'Adobe',
			'TANDBERG Misc. Product Collateral' => 'Cisco',
			'Showtime Catalog' => 'Cicci',
			'Cable Tie Installation Tool Packaging' => 'Thomas & Betts',
			'Fall Military Catalog' => 'Galls',
			'Sample Project 1' => 'Kennametal',
			'Sample Project 2' => 'Adobe',
			'Sample Project 3' => 'Cisco',
			'Sample Project 4' => 'Cicci',
			'Sample Project 5' => 'Thomas & Betts',
			'Sample Project 6' => 'Galls',
			'Sample Project 7' => 'Kennametal',
			'Sample Project 8' => 'Adobe',
			'Sample Project 9' => 'Cisco',
			'Sample Project 10' => 'Cicci',
			'Sample Project 11' => 'Thomas & Betts',
			'Sample Project 12' => 'Galls',
		);

		foreach ($seeds as $title => $client) {
			$image_path = $factory->image('resources/assets/images', 340, 206);
			$image = Image::create([
				'path' => $image_path,
			]);

			$uri = Work::createUri($title);

			Work::create([
				'uri' => $uri,
				'title' => $title,
				'body' => $factory->realText(),
				'client' => Client::where('short_name', $client)->first()->id,
				'image' => $image->id,
			]);
		}
	}
}
