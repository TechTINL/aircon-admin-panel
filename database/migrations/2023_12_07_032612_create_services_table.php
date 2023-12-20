<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('service_number')->nullable();
            $table->string('name');
            $table->string('type'); // contract or adhoc
            $table->integer('technician_count');
            $table->string('service_no_of_time'); // 3 of 4
            $table->date('service_date');
            $table->string('service_time');
            $table->dateTime('service_at');
            $table->string('service_address');
            $table->string('billing_address');
            $table->string('status');
            $table->enum('report_status', ['private', 'public'])->nullable();
            $table->string('technician_report')->nullable();
            $table->text('task_visitation_note')->nullable();
            $table->string('client_signature')->nullable();
            $table->unsignedBigInteger('contract_id')->nullable();
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->unsignedBigInteger('client_id')->nullable();
            $table->unsignedBigInteger('subClient_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
